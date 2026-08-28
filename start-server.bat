@echo off
cd /d D:\Restaurant\restaurant-demo
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.cjs' -WorkingDirectory 'D:\Restaurant\restaurant-demo' -RedirectStandardOutput 'D:\Restaurant\restaurant-demo\server.log' -RedirectStandardError 'D:\Restaurant\restaurant-demo\server.err.log' -WindowStyle Hidden"
