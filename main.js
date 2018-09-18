// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
    tama: './img/yozakuratama.png',
  },
  sound: {
    forward: './sound/yozakuratama.wav',
    backward: './sound/gyakukara.wav',
  },
};
// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#444';
    //テキスト
    this.tama = TamaImage(this.gridX.center(), this.gridY.center(-2.5)).addChildTo(this);
    this.fullname = FullNameLabel(this.gridX.center(), this.gridY.center(3)).addChildTo(this);
    this.forwardButton = ForwardButton(this.gridX.center(-3.5), this.gridY.center(5.5)).addChildTo(this);
    this.backwardButton = BackwardButton(this.gridX.center(3.5), this.gridY.center(5.5)).addChildTo(this);
    self = this;
    this.forwardButton.onpointend = function(){
      // ボタンが押されたときの処理
      self.forwardActions(self);
    };
    this.backwardButton.onpointend = function(){
      // ボタンが押されたときの処理
      self.backwardActions(self);
    };
  },
  forwardActions: function(self){
    self.tama.hop();
    SoundManager.play('forward');
  },
  backwardActions: function(self){
    this.tweener.clear()
    .call(function(){
      self.tama.turn();
      self.fullname.turn();
      SoundManager.play('backward');
    })
    .wait(1305)
    .call(function(){
      self.tama.hop();
    })
    .play();

  }
});

phina.define('TamaImage', {
  superClass: 'Sprite',
  init: function (x, y) {
    this.superInit('tama');
    this.x = x;
    this.y = y;
  },
  hop: function(){
    this.tweener
    .by({
      y: -10
    },200,"swing")
    .by({
      y: 10
    },200,"swing")
    .play();
  },
  turn: function(){
    this.tweener
    .to({
      scaleX: 0
    },250,"swing")
    .to({
      scaleX: 1
    },250,"swing")
    .play();
  }
});

phina.define('FullNameLabel', {
  superClass: 'Label',
  init: function (x, y) {
    this.superInit('夜 桜 た ま');
    this.x = x;
    this.y = y;
    this.fontSize = "80";
    this.fill = 'white'; // 塗りつぶし色
  },
  turn: function(){
    this.tweener
    .to({
      scaleX: 0
    },250,"swing")
    .to({
      scaleX: 1
    },250,"swing")
    .play();
  }
});

phina.define('ReadButton', {
  superClass: 'Button',
  init: function () {
    this.superInit();
    this.width = 175;         // 横サイズ
    this.height =  100;        // 縦サイズ
    this.fontSize = 32;       // 文字サイズ
    this.fontColor = 'red'; // 文字色
    this.cornerRadius = 5;   // 角丸み
    this.fill = 'white';    // ボタン色
    this.stroke = 'green';     // 枠色
    this.strokeWidth = 12;     // 枠太さ
  }
});

phina.define('ForwardButton', {
  superClass: 'ReadButton',
  init: function(x, y) {
    this.superInit();
    this.x = x;
    this.y = y;
    this.text = "前から読む";    // 表示文字
  }
});

phina.define('BackwardButton', {
  superClass: 'ReadButton',
  init: function(x, y) {
    this.superInit();
    this.x = x;
    this.y = y;
    this.text = "逆から読む";    // 表示文字
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    assets: ASSETS,
  });
  //iphone用ダミー音
  app.domElement.addEventListener('touchend', function dummy() {
    var s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });
  // アプリケーション実行
  app.run();
});
