const generateLogo =(name) =>{
    const arr = name.split(' ');
    const logo = arr[0][0]+arr[1][0];
    return logo.toUpperCase();
}

export default generateLogo;