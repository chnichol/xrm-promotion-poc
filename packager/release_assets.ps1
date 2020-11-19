Install-Module Microsoft.Xrm.Data.PowerShell -Scope CurrentUser -Force

Set-Location packager
$solpath = '..\solution_components'

Import-Module ./Microsoft.Federal.PowerApps.SolutionBuilder.dll
$xml = Resolve-SolutionGenerator $solpath

New-Item -Path "../changes/other" -Name "solution.xml" -ItemType File -Force -Value $xml
./SolutionPackager.exe /action:Pack /zipfile:import.zip /folder:"..\changes"
