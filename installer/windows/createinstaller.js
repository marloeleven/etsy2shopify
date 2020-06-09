const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, './app')

  return Promise.resolve({
    appDirectory: path.join(outPath, '/EtsyToShopifyCSV-win32-ia32/'),
    authors: 'Marlo Dela Torre (Semi-Friends)',
    noMsi: true,
    outputDirectory: path.join(outPath, '/windows-installer'),
    exe: 'EtsyToShopifyCSV.exe',
    setupExe: 'EtsyToShopifyAppInstaller.exe',
    setupIcon: path.join(rootPath, 'icon.ico')
  })
}