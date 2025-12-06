export function TypographyBlockquote({title} :{title : string}) {
  return (
    <blockquote className="mt-6 pl-6 italic">
      &quot;{title}&quot;
    </blockquote>
  )
}