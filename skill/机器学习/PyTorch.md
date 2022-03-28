### 学习路线
```
计算机科学速成课：【计算机科学速成课】[40集全/精校] - Crash Course Computer Science
操作系统：BV1js411b7vg
线性代数：麻省理工 线性代数 (MIT 18.06, Linear Algebra, Gilbert Strang)【中英】 / 麻省理工公开课 线性代数 MIT 18.06 Linear Algebra 中英双语字幕
概率论：推荐陈希儒的《概率论与数理统计》 04:17 
Python：【Python教程】《零基础入门学习Python》
C++：https://www.imooc.com/search/?words=C%2B%2B
数据结构：数据结构-浙江大学 ，可同时学习《剑指Offer》 05:13 
UP主出的剑指Offer教程：https://github.com/Jack-Cherish/LeetCode
机器学习：[中英字幕]吴恩达机器学习系列课程
深度学习：[双语字幕]吴恩达深度学习deeplearning.ai
UP主出的机器学习与深度学习开源教程：https://github.com/Jack-Cherish/Machine-Learning
深度学习框架-Pytorch：【计算机-AI】PyTorch学这个就够了！
深度学习框架-Tensorflow：深度学习框架Tensorflow学习与应用
```
### 安装环境
```
anaconda (自带Python)
//下载慢：在官网找到下载地址用迅雷下载贼快
cuda (只能运行在英伟达显卡上，GUP加速)

//安装pytorch
//添加清华镜像源
conda install pytorch torchvision cudatoolkit=10.2
 
//管理员添加以下命令
conda install pytorch torchvision cuda100

https://pytorch.org/
安装PyCharm用于编辑python

使用pip安装PyTorch
pip install torchvision 
```

### 创建一个矩阵
```
torch.empty(5,3)                            //生成一个5行3列的矩阵
torch.rand(5,3)                             //随机生成一个5行3列的矩阵
torch.zeros(5,3,dtype=torch.long)           //初始化一个5行3列的全零的矩阵

x.size()                                    //展示矩阵维度几行几列[5,3]

x + y   或者torch.add(x,y)                  //两个矩阵相加
x[:,1]                                      //索引，冒号表示取所有,输出是所有第2列的数据

//改变矩阵维度
x = torch.randn(4,4)
x.view(16)                                  //把4*4的矩阵扁平化为一维
x.view(-1,8)                                //-1为自动化,自动化为8列的矩阵，行数自己完成
```

### 自动求导机制
```

```