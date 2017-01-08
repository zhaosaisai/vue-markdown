export const setMdContent = (input, content, mode, position, [start, end] = [0, 0]) => {
  let insertedContent = `${content.substring(0, position)}${mode}${content.substring(position, content.length)}`
  input.value = insertedContent
  if (start) input.setSelectionRange(position + start, position + mode.length - end)
  return insertedContent
}


export const updateMdContent = (input, content, start, end, [s1, s2]) => {
  let insertedContent = `${content.substring(0, start)}${s1}${content.substring(start, end)}${s2}${content.substring(end, content.length)}`
    input.value = insertedContent
    let len = insertedContent.length
    input.setSelectionRange(len, len)
    return insertedContent
}
