import React from 'react'

import {
    Paper
} from 'material-ui'

export default class VideoTranslation extends React.Component {
    componentDidMount() {
        navigator.getUserMedia =
            navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia;

        navigator.getUserMedia({audio: true, video: true},
            function(pLocalMediaStream){
                /*
                 * создаём элемент Video,
                 * в который помещаем картинку с веб-камеры\
                 */
                var lVideo = document.getElementById("1");
                lVideo.autoplay = true;
                lVideo.src = URL.createObjectURL(pLocalMediaStream);

            },
            function(pError) { /* если возникла ошибка - выводим её */
                alert(pError);
            });
    }

    render() {
        return (
            <Paper
                zIndex = {2}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    margin: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
            >
                <video
                    id="1"
                ></video>
            </Paper>
        );
    }
}