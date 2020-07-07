import { postData } from './fetch'

export function upload (file) {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onloadend = (e) => {
		let str = 'data:' + file.type + ';base64,'
		let data = e.target.result.substring(str.length)
		return postData({
			upload: {
				'filename': file.name,
				'filedata': data
			}
		})
	}
}

export function test (msg) {
	return postData({
		hello: {
			'msg': msg
		}
	})
}

// // 上传文件
// var formData = new FormData();
// var fileField = document.querySelector("input[type='file']");

// formData.append('username', 'abc123');
// formData.append('avatar', fileField.files[0]);

// fetch('https://example.com/profile/avatar', {
//     method: 'POST',
//     body: formData
// })
//     .then(response => response.json())
//     .catch(error => console.error('Error:', error))
//     .then(response => console.log('Success:', response));



// //上传多个文件
// var formData = new FormData();
// var photos = document.querySelector("input[type='file'][multiple]");

// formData.append('title', 'My Vegas Vacation');
// // formData 只接受文件、Blob 或字符串，不能直接传递数组，所以必须循环嵌入
// for (let i = 0; i < photos.files.length; i++) {
//     formData.append('photo', photos.files[i]);
// }

// fetch('https://example.com/posts', {
//     method: 'POST',
//     body: formData
// })
//     .then(response => response.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));



