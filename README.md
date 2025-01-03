# 创建项目

```shell
pnpm dlx create-next-app@14 --registry=https://registry.npmmirror.com
```

# 依赖

```shell
# 图标库
pnpm i react-icons
# 组件库
pnpm dlx shadcn@latest init
# Which style would you like to use? › New York
# Which color would you like to use as base color? › Zinc
# Do you want to use CSS variables for colors? › no / yes
# 添加所有组件
pnpm dlx shadcn@latest add --all
```

# prisma

```shell
pnpm dlx prisma@5 init
pnpm dlx prisma@5 generate
pnpm dlx prisma@5 db push
```

# tiptap mantine-ui

```shell
pnpm install @mantine/tiptap @mantine/core @mantine/hooks @tiptap/react @tiptap/pm @tiptap/extension-link @tiptap/starter-kit
```

# sass

```shell
pnpm i sass
```

todo: 首页从数据库读数据, 知识库首页sidebar面包屑
