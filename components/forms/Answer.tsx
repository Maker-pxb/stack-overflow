'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnswersSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/dist/client/components/navigation'

interface Props {
  question: string
  questionId: string
  authorId: string
}
const Answer = ({ question, questionId, authorId }: Props) => {
  const { mode } = useTheme()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<z.infer<typeof AnswersSchema>>({
    resolver: zodResolver(AnswersSchema),
    defaultValues: {
      answer: ''
    }
  })

  const editorRef = React.useRef<any>(null)

  const handleCreateAnswer = async (data: z.infer<typeof AnswersSchema>) => {
    setIsSubmitting(true)
    try {
      await createAnswer({
        question: JSON.parse(questionId),
        author: JSON.parse(authorId),
        content: data.answer,
        path: pathname
      })
      form.reset()
      if (editorRef.current) {
        editorRef.current?.setContent('')
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800 h1-bold text-dark100_light900">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 dark:text-primary-500"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="robot"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="!mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content, editor) => {
                      field.onChange(content)
                    }}
                    init={{
                      height: 500,
                      menubar: false,
                      language: 'zh_CN',
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',

                        'insertdatetime',
                        'media',
                        'table'
                      ],
                      toolbar:
                        'undo redo |' +
                        'alignright alignjustify I bullist numlist |' +
                        'codesample bold italic forecolor alignleft aligncenter | ' +
                        'alignright alignjustify |  bullist numlist',
                      content_style:
                        'body { font-family:Inter ; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'default'
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...Submitting' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
