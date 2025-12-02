import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Result
            status="404"
            title="404"
            subTitle="Kechirasiz, bu sahifa mavjud emas."
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    Bosh sahifaga qaytish
                </Button>
            }
        />
    )
}

export default NotFound