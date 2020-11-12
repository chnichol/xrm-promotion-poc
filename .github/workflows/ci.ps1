# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the main branch
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
    
jobs:
  build:

    runs-on: windows-2019

    steps:
    - uses: actions/checkout@v1
    - name: Run a one-line script
      run: powershell .\packager\package.ps1
