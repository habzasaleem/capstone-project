import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const settingsSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 8 && /\d/.test(val)),
      'Password must be at least 8 characters and include a number'
    ),
});

function SettingsFormV2({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
  });

  const submitHandler = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <h2>Settings</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">New Password (optional)</label>
        <input
          id="password"
          type="password"
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />
        {errors.password && (
          <p id="password-error" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        Save
      </button>
    </form>
  );
}

export default SettingsFormV2;