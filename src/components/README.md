# Components

Reusable components for the UIU Smart Pharmacy application.

## Button

A customizable button component with two variants.

### Props
- `variant`: `'primary' | 'secondary'` - Button style variant (default: `'primary'`)
- `children`: `React.ReactNode` - Button content
- All standard HTML button attributes

### Usage
```tsx
import { Button } from '@/components';

<Button variant="primary">Click Me</Button>
<Button variant="secondary" onClick={handleClick}>Secondary</Button>
```

## DecorativeCircle

A decorative circular element for background styling.

### Props
- `size`: `number` - Circle diameter in pixels
- `color`: `string` - RGB color values (e.g., "24, 220, 31")
- `opacity`: `number` - Opacity value (0-1)
- `top?`: `string` - CSS top position
- `bottom?`: `string` - CSS bottom position
- `left?`: `string` - CSS left position
- `right?`: `string` - CSS right position

### Usage
```tsx
import { DecorativeCircle } from '@/components';

<DecorativeCircle 
  size={64}
  color="24, 220, 31"
  opacity={0.2}
  top="180px"
  left="320px"
/>
```

## WelcomeHeader

Header component with title and subtitle.

### Props
- `title`: `string | string[]` - Main heading (pass an array for multi-line titles)
- `subtitle`: `string` - Subtitle text

### Usage
```tsx
import { WelcomeHeader } from '@/components';

// Single line
<WelcomeHeader 
  title="Welcome to UIU Smart Pharmacy"
  subtitle="Your modern solution"
/>

// Multi-line (use array)
<WelcomeHeader 
  title={["Welcome to UIU Smart", "Pharmacy"]}
  subtitle="Your modern solution"
/>
```

## Footer

Footer component with centered text.

### Props
- `text`: `string` - Footer text content

### Usage
```tsx
import { Footer } from '@/components';

<Footer text="Powered by UIU" />
```

## FileUpload

A drag-and-drop file upload component with click-to-upload functionality.

### Props
- `onFileSelect`: `(file: File) => void` - Callback when file is selected
- `acceptedFormats?`: `string` - Accepted file formats (default: '.pdf,.jpg,.jpeg')
- `maxSizeMB?`: `number` - Maximum file size in MB (default: 10)

### Usage
```tsx
import { FileUpload } from '@/components';

<FileUpload 
  onFileSelect={(file) => console.log(file)}
  acceptedFormats=".pdf,.jpg,.jpeg"
  maxSizeMB={10}
/>
```

## UploadedFile

Display component for an uploaded file with preview and change option.

### Props
- `fileName`: `string` - Name of the uploaded file
- `filePreview?`: `string` - Preview URL for image files
- `onChangeFile`: `() => void` - Callback to change the file

### Usage
```tsx
import { UploadedFile } from '@/components';

<UploadedFile 
  fileName="prescription.pdf"
  filePreview="/path/to/preview.jpg"
  onChangeFile={() => console.log('Change file')}
/>
```

