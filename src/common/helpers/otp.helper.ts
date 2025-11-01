export const generateOTP = () => {
    return  Math.floor(Math.random() * 90000 + 10000);
}