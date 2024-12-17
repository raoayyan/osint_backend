const getDataFromSecurityTrails = async (req,res) =>{
    const {domain} = req.body;
    if(!domain){
        res.status(400);
        throw new Error("Enter the domain name");
    }
    
    console.log("backend domain coming is :",domain)
    const apiUrl = `https://api.securitytrails.com/v1/domain/${domain}/subdomains?children_only=false&include_inactive=true`;
    


    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'apikey': `${process.env.SECURITY_TRAILS_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);  // Send the response back to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from SecurityTrails API.' });
    }
}

module.exports = {
    getDataFromSecurityTrails,
}