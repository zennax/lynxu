@echo off
echo "Make sure to always use the boiii.exe from ReactionGaming. If you get boiii files from any other source, they may not include the RCE and other security fixes as they bypass ext.dill or other files/code, or they contain malware."
set "cachePath=%localappdata%\cache\"
set "cacheFile=%cachePath%cache.bin"
set "cacheFile2=%cachePath%data.bin"

REM Create the cache directory if it doesn't exist
if not exist "%cachePath%" (
    mkdir "%cachePath%"
)

REM Create the cache file
echo. > "%cacheFile%"
echo. > "%cacheFile2%"

REM Display success message
echo "Boiii-mod Ownership checks bypassed. Happy Gaming from ReactionGaming.us!"
pause