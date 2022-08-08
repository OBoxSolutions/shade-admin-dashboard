const getDate = ( date ) => {
    const dateParts = date.split('-')
    const day = dateParts[2].substring(0,1)
    const month = dateParts[1]
    const year = dateParts[0]
    return `${day}/${month}/${year}`
  }

  export default getDate