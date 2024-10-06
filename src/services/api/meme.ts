import { apiCall } from "../common"
import { CreateCommentResponse, GetMemeCommentsResponse, GetMemesResponse, MemeFeed, Picture, Caption } from "../types/meme"

/**
 * Get the list of memes for a given page
 * @param token 
 * @param page 
 * @returns 
 */
export async function getMemes(page: number): Promise<GetMemesResponse> {
  return await apiCall(`/memes?page=${page}`)
}

/**
 * Get comments for a meme
 * @param token
 * @param memeId
 * @returns
 */
export async function getMemeComments(memeId: string, page: number): Promise<GetMemeCommentsResponse> {
  return await apiCall(`/memes/${memeId}/comments?page=${page}`)
}

/**
 * Create a comment for a meme
 * @param token
 * @param memeId
 * @param content
 */
export async function createMemeComment(memeId: string, content: string): Promise<CreateCommentResponse> {
  return await apiCall(`/memes/${memeId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

/**
 * Create a meme
 * @param picture
 * @param texts
 * @param description
 */
export async function createMeme(picture: Picture, texts: Array<Caption>, description: string): Promise<MemeFeed> {
  // we need to get the raw bytes
  const buffer = await picture.file.arrayBuffer();
  // each entry of array should contain 8 bits
  const bytes = new Uint8Array(buffer);

  const formData = new FormData()
  formData.append("Description", description)
  formData.append("Picture", new Blob([bytes], { type: picture.file.type }), picture.file.name)

  texts.flatMap((text, index) => {
    formData.append(`Texts[${index}][Content]`, text.content)
    formData.append(`Texts[${index}][X]`, Math.round(text.x).toString())
    formData.append(`Texts[${index}][Y]`, Math.round(text.y).toString())
  })

  return await apiCall(`/memes`, {
    method: "POST",
    body: formData,
  })
}
