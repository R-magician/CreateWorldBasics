### 版本控制
```
版本迭代，管理多人协同开发项目
```

### 安装Git
```
Git:Bash           Unix与Linux风格的命令行，使用最多，推荐最多
Git:CMD            Windows风格的命令行
Git:GUI            图形界面的Git，不建议初学者使用
```

### Git默认配置
```
在linux所有的配置文件都放在etc文件下

git config -list               查看git配置              
git config --system --list     查看系统配置              文件夹：Git安装目录\etc\.gitconfig
git config --global --list     查看当前用户全局配置       文件夹:C:\User\Administrator\.gitconfig

git config --global user.name '名字'        设置名字
git config --global user.email '邮箱'       设置邮箱
```

### Git基本理论
```
Git本地有三个工作区域：工作目录、暂存区、资源库，远程有个git仓库

         git add .            git commit -m           git push
        --------------->      ------------>        ---------->
工作区域                 暂存区             本地仓库            git仓库
        <---------------      <------------        <----------
         git checkout           git reset            git pull

工作目录:平时存放编辑代码的地方
暂存区:本质就是一个文件，看不到
资源库：安全存放数据的位置，这里有提交到所有版本的数据，HEAD文件指向最新放入仓库的版本
git仓库：远程仓库，托管代码
```

### Git 文件操作
```
Untracked:未跟踪                
Unmodify:文件已经入库，未修改
Modified:文件已经修改
Staged:暂存状态

初始化项目              git init
克隆远程仓库            git clone [url]
    1.若clone显示连接超时，可以把克隆链接前面的https换成git
    2.当项目clone下来后要把.git文件夹的config文件里面的链接重新改回https
    3.连接GitHub超时还是要修改hosts文件配置
    
git add .               添加所有文件到暂存区
git commit -m           提交暂存区的文件到本地仓库

忽略文件
    1.在主目录下建立.gitignore文件
    2.*.txt            //忽略所有.txt结尾的文件
    3.!lib.txt         //但lib.txt除外
    4./temp            //仅忽略项目根目录下的TODO文件,但不包括其他目录temp
    5.build/           //忽略build/目录下的所有文件
    6.doc/*.txt        //忽略doc目录下的所有.txt结尾的文件
```

### SSH
```
默认放在 C:\Users\Administrator\.ssh
1.生成公钥        ssh-keygen -t rsa               rsa是加密算法
2.然后一直按回车就可以了
3.在文件夹中(C:\Users\Administrator\.ssh)找到文件
4.打开id_rsa.pub文件粘贴里面的代码到SSH密钥中
```
