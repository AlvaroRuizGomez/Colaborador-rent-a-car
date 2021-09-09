exports.IsSafari = async (useragent) =>
{
    let safari = false;
    // -1 => no existe
    // otro numero => existe
    if (useragent !== undefined)
    {
        const nombreNavegador = useragent.indexOf("Version");
    
        if (nombreNavegador !== -1) {
            safari = true;
        }
    }

    return safari;

};

exports.IsAvifSupported = async (header) =>
{

    let isSupported = false;

    if (header !== undefined)
    {
        const avifEncontrado = header.indexOf("image/avif");
    
        if (avifEncontrado !== -1) {
            isSupported = true;
        }
    }


    return isSupported;

};