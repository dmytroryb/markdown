export async function imagesUploadEmulation(files) {
  return new Promise((resolve) => {
    const result = []
    if(Array.isArray(files)) {
      files.forEach(item => {
        result.push({
          id: `${item.name}-${item.lastModified}`,
          fileName: item.name,
          fileUrl: URL.createObjectURL(item)
        })
      });
    }
    
    setTimeout(() => {
      resolve(result)
    }, 2000);
  })
}
export async function videosUploadEmulation(files) {
  return new Promise((resolve) => {
    const result = []
    if(Array.isArray(files)) {
      files.forEach(item => {
        result.push({
          id: `${item.name}-${item.lastModified}`,
          fileName: item.name,
          fileUrl: URL.createObjectURL(item),
          fileType: "video/mp4",
        })
      });
    }
    
    setTimeout(() => {
      resolve(result)
    }, 2000);
  })
}
export async function filesUploadEmulation(files) {
  return new Promise((resolve) => {
    const result = []
    if(Array.isArray(files)) {
      files.forEach(item => {
        result.push({
          id: `${item.name}-${item.lastModified}`,
          fileName: item.name,
          fileUrl: URL.createObjectURL(item),
          fileType: item.fileType,
        })
      });
    }
    
    setTimeout(() => {
      resolve(result)
    }, 2000);
  })
}