exports.IsSafari = async (useragent) =>
{
    let safari = false;
    // -1 => no existe
    // otro numero => existe
    const nombreNavegador = useragent.indexOf("Version");

    if (nombreNavegador !== -1) {
        safari = true;
    }

    return safari;

};