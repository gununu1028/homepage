---
title: WSL2でLaravelを試す
tags: WSL2
date: 2020-06-06
---

# WSL2でLaravel5.8を試す

WSL2でLaravelを試します。  
あえてDockerを使わない方法です。  
検証でさくっと動かしたいときにわざわざ設定するのが面倒かと思い、普通に色々インストールします。  
複数人で管理しているプロジェクトでは、素直にDockerを使うことをおすすめします。

### はじめに

こちらの記事を参考に、WSL2のインストールやUbuntu20.04のインストールを完了させます。  
[WSL 2 のインストール，Ubuntu 20.04, 18.04 のインストールと利用](https://www.kkaneko.jp/tools/wsl/wsl2.html)

### PHPとcomposerをインストール

```
sudo apt -yV install php7.4
sudo apt -yV install composer
```

### PHPの拡張モジュールをインストール

Laravelのサーバ要件を満たすために、PHPの拡張モジュールをインストールします。   
[インストール 5.8 Laravel](https://readouble.com/laravel/5.8/ja/installation.html)

```
sudo apt -yV install php7.4-bcmath php7.4-cli php7.4-json php7.4-mbstring php7.4-xml
```

### MySQLの起動・初期設定

```
sudo service mysql start
sudo mysql_secure_installation 
```

### Laravelプロジェクトを作成

```
composer create-project --prefer-dist laravel/laravel blog "5.8.*"
cp .env.example .env
php artisan key:generate
```

以上です。
