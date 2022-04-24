# 家庭記帳本 expense-tracker
使用 Node.js + Express 製作的記帳本，可簡單記錄支出記錄。

## Features
- 首頁可查看所有支出記錄及它們的簡單資料
- 首頁可點選個別支出記錄，查看詳細資訊
- 首頁可使用「類別」篩選支出記錄
- 使用者可以自行新增、修改、刪除支出記錄
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼(所有欄位都是必填)。
- 使用者可以透過 Facebook Login 直接登入

## Installation and Execution
1. 在終端機輸入指令將此專案 clone 到本機電腦
```
git clone https://github.com/Lydia-09/expense-tracker.git
```

2. 安裝相關套件
```
cd expense-tracker
```
```
npm install
```

3. 調整環境變數
- 將 .env.example 更名為 .env
- 將 .env 檔案中 FACEBOOK_ID & FACEBOOK_SECRET 的 SKIP 調整為您的環境變數。
```
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
```

4. 匯入種子資料
```
npm run seed
```

5. 執行程式
```
npm run dev
```
終端機顯示 App is listening on localhost:3000 表示啟動完成，請至 http://localhost:3000 使用此專案程式。

## Prerequisites
- Visual Studio Code - Development Environment
- Node.js & npm - JavaScript Runtime Environment
- Express.js - Web Application Framework
- Express-Handlebars - Template Engine
- MongoDB - Document-oriented Database
- Mongoose - MongoDB Object Modeling(ODM)
- body-parser, method-override & bcrypt.js - Middleware
- passport - authentication middleware for Node.js
- Facebook for Developer - get APP_ID & APP_SECRET for passport-facebook