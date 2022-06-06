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
```

## 装饰器
```
@Controller         控制器-管理路由
@Get                get请求路径


@Query              get请求参数
@Param              对象参数
```
