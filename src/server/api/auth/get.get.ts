export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event)
    return resp(event, { result: auth })
  } 
  catch (e:any) {
    return resp(event, { code: 401, message: e.toString() })
  }
})