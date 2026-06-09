# Git初始化脚本
# 使用方法: 在安装Git后，右键以PowerShell运行此脚本

Write-Host "============================================="
Write-Host "校园资源智能管控平台 - Git初始化脚本"
Write-Host "============================================="
Write-Host ""

# 检查Git是否安装
try {
    git --version | Out-Null
    Write-Host "[OK] Git已安装" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git未安装，请先安装Git" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/download/win"
    Read-Host "按任意键退出..."
    exit 1
}

# 设置Git用户信息
Write-Host ""
Write-Host "设置Git用户信息..."
git config user.name "校园资源管控平台"
git config user.email "admin@campus-resource.com"
git config --global core.autocrlf true

Write-Host "[OK] Git用户信息已设置" -ForegroundColor Green

# 初始化Git仓库
Write-Host ""
Write-Host "初始化Git仓库..."
git init

Write-Host "[OK] Git仓库已初始化" -ForegroundColor Green

# 添加所有文件
Write-Host ""
Write-Host "添加文件到暂存区..."
git add .

Write-Host "[OK] 文件已添加" -ForegroundColor Green

# 提交代码
Write-Host ""
Write-Host "提交代码..."
git commit -m "初始化校园资源智能管控平台"

Write-Host "[OK] 代码已提交" -ForegroundColor Green

# 显示状态
Write-Host ""
Write-Host "============================================="
Write-Host "Git初始化完成！"
Write-Host "============================================="
Write-Host "当前仓库状态:"
git status

Write-Host ""
Read-Host "按任意键退出..."
