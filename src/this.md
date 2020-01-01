---
title: $this->validate()の$thisとは？
tags: PHP Laravel
date: 2019-12-20
footer: Copyright (c) 2019 Matsuda Atsushi
---

# $this->validate()の$thisとは？

## はじめに

以下のようなサンプルコードがある。

```php:app/Http/Controllers/Admin/NewsController.php

<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\News;

class NewsController extends Controller
{
  // 入力された値をもとにデータベースへ保存する
  public function create(Request $request)
  {
      // バリデーションを行う
      $this->validate($request, News::$rules);

      $news = new News;
      $form = $request->all();

      $news->fill($form);
      $news->save();

      return redirect('admin/news/create');
  }
}

```

`$this->validate()` とは、バリデーションを行う。
データを保存する前に、データを送信されてきた値が正しいかどうか確認が必要な場合がある。
例えば、ニュース投稿でタイトルが入力されていなかったときに、何も検証しないままでは不完全なデータを登録してしまう。
このようなデータの不備を、あらかじめ防ぐために検証する仕組みがバリデーションである。

しかし、突然 `$this` が現れている。今回はこれについて説明する。

## $thisを見てみよう

変数の中身を確認できる関数 `var_dump()` を利用する。

```php:app/Http/Controllers/Admin/NewsController.php
class NewsController extends Controller
{
  // ニュース投稿画面を開く
  public function add()
  {
      var_dump($this);
  }
}
```

実行結果は以下の通りである。

<img width="700" alt="全画面_2019_09_24_9_24.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/227802/33cfa887-dbdd-281c-50a1-7c2f9d6aba13.png">

`$this` にはNewsControllerのObjectが入っているようだ。
つまり、NewsController自体を指しているという意味である。

## もう少し深掘りする

NewsController自体を指すとは、どういう意味か？
プログラムで `class NewsController extends Controller` と宣言しているがこれが鍵となっている。
NewsControllerという名前でクラス定義している。

classを直訳すると、共通の性質を有している部類、種類という意味である。
これでは分かりづらいので、学校のクラスを想像してほしい。
学校のクラスには様々な生徒がいる。国語が得意な子、音楽が得意な子など、生徒それぞれには特徴がある。
また、担任の先生も存在する。
さらに教室の中には、黒板や机、椅子もある。
そのように一つのクラスには様々な人やものが所属していると考えるが、これと同様と思って良い。
ちなみに生徒や先生、黒板などをメンバーという。


<img width="1113" alt="6067dfb43921b34d9f6c53d59946a599.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/227802/581fb475-b794-11bc-0ae3-4a3c9078e1f1.png">

上の図のように、NewsControllerにはindex()やadd()などのメソッドが含まれており、これらはNewsControllerのメンバーといえる。

## NewsControllerにはvalidate()がない？

一つのクラスには様々な人やものが所属していると考えれば良い、と出たがNewsControllerにはvalidate()なんて存在しない。
それではどこにあるのか？

プログラムで `class NewsController extends Controller` と宣言しているが、またこれが重要なポイントである。
これはControllerを継承してNewsControllerを宣言しており、Controllerのメンバーを利用して良いという意味である。

```php:app/Http/Controllers/Controller.php
<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
```

Controllerにもvalidate()がない。

答えを先に言うと、
`vendor/laravel/framework/src/Illuminate/Foundation/Validation/ValidatesRequests.php` にvalidate()がある。

今回は `use AuthorizesRequests, DispatchesJobs, ValidatesRequests;` がポイントで、これで他のプログラムを呼び出している。
ValidatesRequests.phpに存在するメソッドなどを利用できる。
つまり、バリデーションはLaravelで用意されている機能である。
