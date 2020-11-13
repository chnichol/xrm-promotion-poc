Get-Host | Select-Object Version
Set-Location packager
$solpath = '..\solution_components'
Import-Module ./Microsoft.Federal.PowerApps.SolutionBuilder.dll
$xml = Resolve-SolutionGenerator $solpath
New-Item -Path "../solution_components/other" -Name "solution.xml" -ItemType File -Force -Value $xml

./SolutionPackager.exe /action:Pack /zipfile:import.zip /folder:"..\solution_components"

Expand-Archive -Path import.Zip -DestinationPath ../artifacts/