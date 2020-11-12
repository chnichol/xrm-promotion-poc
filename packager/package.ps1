Get-Host | Select-Object Version
Set-Location packager
$solpath = '..\solution_components'
Import-Module ./Microsoft.Federal.PowerApps.SolutionGenerator.dll
$xml = Resolve-SolutionGenerator $solpath
New-Item -Path "../solution_components/other" -Name "solution.xml" -ItemType File -Force -Value $xml

./SolutionPackager.exe /action:Pack /zipfile:../import/us1000_1_0_0_1.zip /folder:"..\solution_components"
