import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Container, Typography, Grid, TextField, MenuItem } from '@material-ui/core';

function CheckOut(props) {
    const [emailBuy, setEmailBuy] = useState('');
    const [nameBuy, setNameBuy] = useState('');
    const [phoneBuy, setPhoneBuy] = useState('');
    const [addressBuy, setAddressBuy] = useState('');
    const [cityBuy, setCityBuy] = useState('');

    // useEffect(() => {
    //     axios.get('https://api.mysupership.vn/v1/partner/areas/district?province=79', {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then((res) => console.log(res))
    //         .catch(err => console.log(err))

    // }, [])

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'emailBuy':
                return setEmailBuy(e.target.value);

            case 'nameBuy':
                return setNameBuy(e.target.value);

            case 'phoneBuy':
                return setPhoneBuy(e.target.value);

            case 'addressBuy':
                return setAddressBuy(e.target.value);

            default: return;
        }
    }
    return (
        <>
            <Container maxWidth="lg" component="main">
                <Grid container spacing={5}>
                    <Grid item sm={false} md={4}>
                        <Typography variant='h5'>
                            Thông tin mua hàng
                        </Typography>
                        <TextField
                            required
                            id="emailBuy"
                            name="emailBuy"
                            label="Email"
                            value={emailBuy}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="nameBuy"
                            name="nameBuy"
                            label="Họ và tên"
                            value={nameBuy}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="phoneBuy"
                            name="phoneBuy"
                            label="Số điện thoại"
                            value={phoneBuy}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="addressBuy"
                            name="addressBuy"
                            label="Địa chỉ"
                            value={addressBuy}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Multiline Placeholder"
                            placeholder="Placeholder"
                            multiline
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={false} md={4}>
                        <Typography component="div" style={{ backgroundColor: 'red', height: '100vh' }} />
                    </Grid>
                    <Grid item sm={false} md={4}>
                        <Typography component="div" style={{ backgroundColor: 'green', height: '100vh' }} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

CheckOut.propTypes = {

}

export default CheckOut

