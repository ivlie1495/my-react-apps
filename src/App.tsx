import {
  Control,
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  FieldErrors,
} from 'react-hook-form'
import { z } from 'zod'

import Box from './components/Box'

import './App.css'

const schema = z
  .object({
    name: z.string().min(3),
    age: z.string().min(3),
    options: z.array(z.object({ key: z.string(), value: z.string() })),
    testField: z.string(),
    isRequired: z.boolean(),
  })
  .partial()

type FormData = z.infer<typeof schema>

const ConditionalInput = ({
  control,
  index,
  errors,
}: {
  control: Control<FormData>
  index: number
  errors: FieldErrors<FormData>
}) => {
  const value = useWatch({
    control,
  })
  const key = value.options?.[index]?.key
  const hasKey = !!key

  return (
    <>
      <div>
        <Controller
          control={control}
          name={`options.${index}.key`}
          rules={{ required: hasKey }}
          render={({ field }) => (
            <input {...field} type="text" placeholder="Key" />
          )}
        />
        {errors.options?.[index]?.key && (
          <p style={{ color: 'red' }}>Key is required</p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name={`options.${index}.value`}
          rules={{ required: hasKey }}
          disabled={!hasKey}
          render={({ field }) => (
            <input {...field} type="text" placeholder="Value" />
          )}
        />
        {errors.options?.[index]?.value && (
          <p style={{ color: 'red' }}>Value is required</p>
        )}
      </div>
    </>
  )
}

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      age: '',
      options: [],
      isRequired: false,
      testField: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <main>
      <Box>
        <h1>Hello World!</h1>
        <p>API URL: {import.meta.env.VITE_API_URL}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <input {...field} type="text" placeholder="Name" />
              )}
            />
            {errors.name && <p style={{ color: 'red' }}>Name is required</p>}
          </div>
          <div>
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <input {...field} type="text" placeholder="Age" />
              )}
            />
            {errors.age && <p style={{ color: 'red' }}>Age is required</p>}
          </div>
          {fields.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', gap: 16 }}>
              <ConditionalInput
                control={control}
                index={index}
                errors={errors}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                data-testid="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <Controller
              control={control}
              name="testField"
              render={({ field }) => (
                <input {...field} type="text" placeholder="Test Field" />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="isRequired"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="checkbox"
                  placeholder="Test Field"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          <button type="button" onClick={() => append({ key: '', value: '' })}>
            Add option
          </button>
          <button type="submit" data-testid="button-test">
            This is a button
          </button>
        </form>
      </Box>
    </main>
  )
}

export default App
