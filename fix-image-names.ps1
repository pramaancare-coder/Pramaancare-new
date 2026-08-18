# fix-image-names.ps1  (v2)
# Renames every file in public\images to a URL-safe slug and updates all
# references across the codebase.
#
# DRY RUN (default) - shows what would change, touches nothing:
#     .\fix-image-names.ps1
#
# APPLY - performs the renames and rewrites references:
#     .\fix-image-names.ps1 -Apply

param(
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$imagesDir   = Join-Path $projectRoot 'public\images'

if (-not (Test-Path $imagesDir)) {
    Write-Host "ERROR: $imagesDir not found. Run this from the project root." -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------------------
# Slug builder
# ---------------------------------------------------------------------------
function Get-Slug {
    param([string]$Name)

    $ext  = [System.IO.Path]::GetExtension($Name)
    $base = [System.IO.Path]::GetFileNameWithoutExtension($Name)

    $base = $base -replace '[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]', '-'
    $base = $base -replace '&', ' and '
    $base = $base -replace '[^a-zA-Z0-9\-]', '-'
    $base = $base -replace '-+', '-'
    $base = $base.Trim('-')

    return ($base.ToLower() + $ext.ToLower())
}

# ---------------------------------------------------------------------------
# Build the rename map
# ---------------------------------------------------------------------------
$files = Get-ChildItem -LiteralPath $imagesDir -File
$map   = @()
$taken = @{}

foreach ($f in $files) {
    $new = Get-Slug $f.Name

    if ($taken.ContainsKey($new)) {
        $n = 2
        $ext  = [System.IO.Path]::GetExtension($new)
        $stem = [System.IO.Path]::GetFileNameWithoutExtension($new)
        while ($taken.ContainsKey("$stem-$n$ext")) { $n++ }
        $new = "$stem-$n$ext"
    }
    $taken[$new] = $true

    if ($f.Name -cne $new) {
        $map += [pscustomobject]@{ Old = $f.Name; New = $new }
    }
}

if ($map.Count -eq 0) {
    Write-Host "Nothing to rename - all filenames are already clean." -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "=== RENAME PLAN ($($map.Count) files) ===" -ForegroundColor Cyan
$map | Format-Table -AutoSize | Out-String | Write-Host

# ---------------------------------------------------------------------------
# Collect source files
# FIXED: -Include combined with -File was silently matching nothing.
# Filter on .Extension via Where-Object instead, reliable in PS 5.1.
# ---------------------------------------------------------------------------
$exts = @('.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json', '.md', '.mjs')

$codeFiles = Get-ChildItem -LiteralPath $projectRoot -Recurse -File |
    Where-Object {
        $exts -contains $_.Extension.ToLower() -and
        $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\\.git\\|\\out\\|\\dist\\'
    }

Write-Host "=== REFERENCE SCAN ===" -ForegroundColor Cyan
Write-Host "Searching $($codeFiles.Count) source file(s)..." -ForegroundColor Gray

if ($codeFiles.Count -eq 0) {
    Write-Host "ABORT: found 0 source files to search. Renaming now would" -ForegroundColor Red
    Write-Host "break every image reference. Fix this before continuing." -ForegroundColor Red
    exit 1
}

$refHits = @()
foreach ($cf in $codeFiles) {
    $content = Get-Content -LiteralPath $cf.FullName -Raw -Encoding UTF8
    if ([string]::IsNullOrEmpty($content)) { continue }

    foreach ($m in $map) {
        $encoded = $m.Old -replace ' ', '%20'
        if ($content.Contains($m.Old) -or ($encoded -ne $m.Old -and $content.Contains($encoded))) {
            $refHits += [pscustomobject]@{
                File = $cf.FullName.Replace($projectRoot, '.')
                Old  = $m.Old
                New  = $m.New
            }
        }
    }
}

if ($refHits.Count -eq 0) {
    Write-Host "WARNING: no references found. Images may be loaded dynamically." -ForegroundColor Yellow
} else {
    $refHits | Format-Table -AutoSize | Out-String | Write-Host
    $fileCount = ($refHits | Select-Object -ExpandProperty File -Unique).Count
    Write-Host "$($refHits.Count) reference(s) across $fileCount file(s)." -ForegroundColor Cyan
}

# ---------------------------------------------------------------------------
# Orphan check
# ---------------------------------------------------------------------------
$referenced = $refHits | Select-Object -ExpandProperty Old -Unique
$orphans = $map | Where-Object { $referenced -notcontains $_.Old } | Select-Object -ExpandProperty Old

if ($orphans) {
    Write-Host ""
    Write-Host "=== NOT REFERENCED IN CODE ($($orphans.Count)) ===" -ForegroundColor Yellow
    Write-Host "Still renamed. Verify none are loaded dynamically:" -ForegroundColor Yellow
    $orphans | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
}

# ---------------------------------------------------------------------------
# Apply
# ---------------------------------------------------------------------------
if (-not $Apply) {
    Write-Host ""
    Write-Host "DRY RUN - nothing was changed." -ForegroundColor Green
    Write-Host "To apply:  .\fix-image-names.ps1 -Apply" -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "=== APPLYING ===" -ForegroundColor Magenta

# 1. Rename via a temp name so case-only changes work on Windows
$renamed = 0
foreach ($m in $map) {
    $src = Join-Path $imagesDir $m.Old
    if (-not (Test-Path -LiteralPath $src)) {
        Write-Host "  SKIP (missing): $($m.Old)" -ForegroundColor Yellow
        continue
    }
    $tmpName = "__tmp__" + [guid]::NewGuid().ToString('N').Substring(0,8) + [System.IO.Path]::GetExtension($m.New)
    Rename-Item -LiteralPath $src -NewName $tmpName
    Rename-Item -LiteralPath (Join-Path $imagesDir $tmpName) -NewName $m.New
    Write-Host "  $($m.Old)  ->  $($m.New)" -ForegroundColor Gray
    $renamed++
}

# 2. Rewrite references, longest names first so short names can't clobber
#    longer ones that contain them as substrings
$sorted = $map | Sort-Object { $_.Old.Length } -Descending

$changedFiles = 0
foreach ($cf in $codeFiles) {
    $content = Get-Content -LiteralPath $cf.FullName -Raw -Encoding UTF8
    if ([string]::IsNullOrEmpty($content)) { continue }
    $original = $content

    foreach ($m in $sorted) {
        $content = $content.Replace($m.Old, $m.New)
        $oldEnc = $m.Old -replace ' ', '%20'
        if ($oldEnc -ne $m.Old) {
            $content = $content.Replace($oldEnc, $m.New)
        }
    }

    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($cf.FullName, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "  updated: $($cf.FullName.Replace($projectRoot, '.'))" -ForegroundColor Gray
        $changedFiles++
    }
}

Write-Host ""
Write-Host "Done. $renamed file(s) renamed, $changedFiles source file(s) updated." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Remove-Item -Recurse -Force .next"
Write-Host "  2. npm run dev"
Write-Host "  3. Click through every page, confirm no broken images"
Write-Host "  4. npx tsc --noEmit"
