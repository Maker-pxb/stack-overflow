import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { question } = await req.json()

  try {
    const response = await fetch(
      `${process.env.CHATGPT_API_URL}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                '你是全栈开发人员，具有HTML、CSS、JavaScript、Python、Java、Ruby和React、Angular、Vue.js、Express、Django、Next.js、Flask或Ruby on Rails框架经验的全栈Web开发人员。具备数据库、应用架构、安全性和测试经验。'
            },
            {
              role: 'user',
              content: `请给出如下问题的答案: \n ${question}`
            }
          ]
        })
      }
    )
    const responseData = await response.json()
    const reply = responseData?.choices?.[0]?.message?.content
    console.log('🚀 ~ POST ~ reply:', reply)
    return NextResponse.json({ reply })
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
