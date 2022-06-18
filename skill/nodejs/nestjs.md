## 安装
```
//安装框架
npm i -g @nestjs/cli
//新建项目
nest new project-name

//在java中叫注解,node是装饰器
```

## nest 工具推荐
```
//nest 工具推荐目录
nest -h

//新建一个控制器,会自动注入到app.module.ts中
nest g co 控制器名称
spec.ts是控制器的单元测试(用的jest)

//新建一个service层,会自动加载到app.module.ts中
nest g s 服务层名称

dto 数据层，定义数据模板
```



## 装饰器
```
@Controller         控制器-管理路由
@Get                get请求路径


@Query              get请求参数
@Param              对象参数
```

## 中间件
```js
//局部中间件---在app.module文件中添加
configure(consumer: MiddlewareConsumer) {
    //apply--应用哪一个中间件
    //exclude:排除请求
    //forRoutes:拦截类型--可以拦截地址+请求类型--路由地址可以支持匹配模式--也可以给控制器加:forRoutes(UserController)
    consumer.apply(LoggerMiddleware).forRoutes('user');
}

//全局中间件---在main.ts文件中添加
app.use(LoggerMiddleware);
```

## 异常过滤器
```js
//https://nestjs.bootcss.com/exception-filters
nest g f http-exception
//在某一个请求上绑定异常拦截
@Get
@UseFilters(HttpExceptionFilter)

//全局捕获异常处理--在main.ts里面
app.useGlobalFilters(new HttpExceptionFilter());

```

## 管道
```
//https://nestjs.bootcss.com/pipes
请求先走 Fillter 再走管道 最后到控制器
//管道有两种类型
转换：将数据转换为所需的数据输出
验证：对输入数据进行验证,如果验证成功继续传递，验证失败则抛出异常

ValidationPipe
ParseIntPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
DefaultValuePipe
```

## 守卫
```
https://nestjs.bootcss.com/guards
在每个中间件之后，任何拦截器之前执行
nest g gu role

//UseGuards--守卫--局部守卫
@UseGuards(RoleGuard)

```
