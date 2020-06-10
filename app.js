const imgPreview = document.getElementById('img-preview');
const imgUploader = document.getElementById('img-uploader');
const imgUploadBar = document.getElementById('img-upload-bar');

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqmd7sbgl/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'xir79dzg';

imgUploader.addEventListener('change', async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e){
            console.log(Math.round((e.loaded * 100)/e.total));
            const progress = (e.loaded * 100) / e.total;
            imgUploadBar.setAttribute('value', progress);
        }
    });
    console.log(res);
    imgPreview.src=  res.data.secure_url;
});