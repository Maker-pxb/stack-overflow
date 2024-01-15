'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { QuestionsSchema } from '@/lib/validations'
import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'
import { createQuestion, editQuestion } from '@/lib/actions/question.action'
import { useRouter, usePathname } from 'next/navigation'
import { Badge } from '../ui/badge'
import { EditType, VoteType } from '@/types/enum'
interface QuestionProps {
  type?: EditType
  mongoUserId: string
  questionDetails?: string
}
const Question = ({
  mongoUserId,
  type = EditType.CREATE,
  questionDetails
}: QuestionProps) => {
  console.log('🚀 ~ questionDetails:', questionDetails)

  const parsedQuestionDetails = questionDetails && JSON.parse(questionDetails)
  const groupedTags = parsedQuestionDetails?.tags?.map((tag: any) => tag.name)
  const router = useRouter()
  const pathname = usePathname()
  const editorRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || '',
      explanation: parsedQuestionDetails?.content || '',
      tags: groupedTags || []
    }
  })

  // eslint-disable-next-line no-undef
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault()
      const targetInput = e.target as HTMLInputElement
      const targetValue = targetInput.value.trim()

      if (targetValue) {
        if (field.value.length >= 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.'
          })
        }
        if (!field.value.includes(targetValue)) {
          form.setValue('tags', [...field.value, targetValue])
          targetInput.value = ''
          form.clearErrors('tags')
        } else {
          form.trigger()
        }
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const filteredTags = field.value.filter((t: string) => t !== tag)
    form.setValue('tags', filteredTags)
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true)
    try {
      if (type === EditType.EDIT) {
        await editQuestion({
          questionId: parsedQuestionDetails?._id,
          title: values.title,
          content: values.explanation,
          path: pathname
        })
        router.push(`/question/${parsedQuestionDetails?._id}`)
      } else if (type === EditType.CREATE) {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname
        })
        router.push('/')
      }
    } catch (error) {
      console.log('🚀 ~ file: Question.tsx:91 ~ onSubmit ~ error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="!mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 mt-3.5 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="!mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content, editor) => {
                    field.onChange(content)
                  }}
                  initialValue={parsedQuestionDetails?.content || ''}
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
                    content_style: 'body { font-family:Inter ; font-size:16px }'
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="!mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 mt-3.5 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    disabled={type === EditType.EDIT}
                  />
                  <div className="flex-start mt-2.5 gap-2.5">
                    {field.value.map((tag, index) => (
                      <Badge
                        key={index}
                        className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                      >
                        {tag}
                        {type === EditType.CREATE && (
                          <Image
                            src={'/assets/icons/close.svg'}
                            alt="close"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                            onClick={() => handleTagRemove(tag, field)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit !text-light-900"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === EditType.EDIT ? 'Updating...' : 'Submitting...'}</>
          ) : type === EditType.EDIT ? (
            'Update Question'
          ) : (
            'Ask Question'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default Question
