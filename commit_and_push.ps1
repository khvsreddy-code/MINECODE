$currentDir = Get-Location
$repoPath = "c:\Users\harin\OneDrive\New folder\OneDrive\Desktop\khvs personal coding files\minecode - ai code learning app startup"

Set-Location $repoPath

git add .
git commit -m "Fix Course Catalog Spacing & Optimize Performance

- Fixed missing .codedex-card CSS classes causing invisible course cards.
- Optimized matrix-rain.js to 30fps to reduce CPU load.
- Added will-change hints to heavy CSS animations.
- Simplifed course catalog hero overlay to fix video lag."
git push origin main

Set-Location $currentDir
Write-Host "Changes committed and pushed successfully!"
