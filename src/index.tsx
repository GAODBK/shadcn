import { Hono } from 'hono'
import { renderer } from './renderer'
import initView from './view'
import { ViewRenderer } from './middleware'
import createBlogServer from './blog'

initView()
const app = new Hono()

app.use(renderer)
app.use(ViewRenderer)

app.get('/', (c) => {
  return c.view('hello', {
    meta: {
      title: 'Honojs demo with react SSR and shadcn UI.',
    },
    props: {
      tp: 'index'
    }
  })
})

// todo you need change the blog server user name and password
app.route('/', createBlogServer({
  defaultOGImage: 'https://tgimgbed-f3l.pages.dev/file/1735809570871_06765f5349c7f7a453c4c8c0055aa452.gif',
  blogTitle: 'React Blog',
  blogDescription: 'jo 分享有关 Honojs 故事的地方.',
  urlPrefix: 'https://blog-97c.pages.dev',
  publisher: 'https://sfghgh.pages.dev',
}))

export default app
