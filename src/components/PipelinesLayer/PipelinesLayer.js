import React, {Fragment} from "react";
import {Marker, Popup} from "react-leaflet";

const PipelinesLayer = (props) => {

    const {pipelines} = props;



    const tunnelSvg = `
      <svg width="25" height="25" viewBox="0 0 424 423" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M424 71.6427C424 57.2804 412.017 44.2554 391.74 36.6846L308.783 5.62345C308.597 5.51242 308.414 5.51242 308.23 5.4004C289.426 -1.39117 266.567 -1.83528 247.21 4.39917L71.8978 60.1741C27.6527 74.3143 0 101.814 0 132.095V408.861C0 417.433 15.4859 423 39.6341 423C44.2434 423 48.8527 422.777 53.6459 422.444C79.0859 420.328 104.708 412.535 104.708 401.736V150.241L159.646 170.838V380.138C159.646 388.71 175.314 394.276 199.28 394.276C203.889 394.276 208.497 394.054 213.292 393.72C238.732 391.605 264.354 383.812 264.354 373.012V79.6586L85.7225 136.548V389.266C79.823 388.154 73.0025 387.486 65.0741 387.486C60.4664 387.486 55.857 387.709 51.0638 388.042C39.6357 389.044 28.2059 391.16 18.9872 394.165V131.983C18.9872 106.044 42.5838 82.3302 80.7438 70.1954L255.876 14.4185C269.333 10.0775 285.186 10.4106 298.276 15.1987C311.363 19.9848 319.106 28.3347 319.106 37.5748V351.303C319.106 359.875 334.592 365.443 358.74 365.443C363.35 365.443 367.957 365.22 372.752 364.886C398.192 362.77 423.815 354.977 423.815 344.179V71.6427H424ZM245.367 149.795V360.434C239.467 359.32 232.647 358.653 224.72 358.653C220.111 358.653 215.503 358.875 210.708 359.209C199.28 360.21 187.852 362.326 178.633 365.332V171.06L245.367 149.796V149.795ZM210.71 382.253C206.837 382.587 202.967 382.698 199.28 382.698C186.376 382.698 179.923 380.693 178.633 379.803C179.923 377.688 192.274 372.344 213.29 370.563C217.163 370.229 221.033 370.117 224.72 370.117C237.624 370.117 244.077 372.121 245.367 373.011C244.077 375.238 231.726 380.583 210.71 382.253ZM245.367 136.881L169.416 161.039L114.111 140.333L245.368 98.584V136.882L245.367 136.881ZM53.6459 399.399C57.5166 399.064 61.3873 398.952 65.0741 398.952C77.9796 398.952 84.4307 400.957 85.7225 401.847C84.4307 403.963 72.08 409.307 51.0638 411.087C47.1932 411.421 43.3225 411.533 39.6357 411.533C26.7302 411.533 20.2775 409.529 18.9872 408.639C20.2791 406.523 32.6298 401.179 53.6459 399.399ZM405.013 71.6427V331.709C399.113 330.596 392.293 329.928 384.366 329.928C379.757 329.928 375.147 330.151 370.354 330.485C358.926 331.487 347.496 333.602 338.277 336.608V37.4638C338.277 34.6802 337.726 32.1196 336.803 29.448L381.784 46.2589C396.347 51.8251 405.013 61.2883 405.013 71.6427ZM370.354 353.53C366.483 353.864 362.613 353.975 358.926 353.975C346.02 353.975 339.569 351.972 338.277 351.08C339.569 348.966 351.92 343.622 372.936 341.84C376.807 341.506 380.677 341.395 384.364 341.395C397.27 341.395 403.723 343.399 405.013 344.29C403.721 346.405 391.37 351.749 370.354 353.53Z" fill="black"/>
        <path d="M0 0V-1H-1V0H0ZM424 0H425V-1H424V0ZM424 423V424H425V423H424ZM0 423H-1V424H0V423ZM0 1H424V-1H0V1ZM423 0V423H425V0H423ZM424 422H0V424H424V422ZM1 423V0H-1V423H1Z" fill="white"/>
    </svg>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: tunnelSvg
        }
    );

    let Elements;
    if (pipelines.pipelines) {
        Elements = pipelines.pipelines.map(pipeline => {
            const pointsStr = pipeline.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];
                if (point1 && point2 && points) {
                    return (
                    <Marker position={points} key={pipeline.id} icon={divIcon}
                            onContextMenu={(event) => {
                    }}>
                        <Popup>
                            <p>Название трубопровода: {pipeline.name}</p>
                            <p>Высота трубопровода: {pipeline.height ? pipeline.height : 'Не указано'}</p>
                            <p>Принадлежность дороге: {pipeline.road_name ? pipeline.road_name : 'Не указано'}</p>
                            <p>Расположен на {pipeline.place_km ? pipeline.place_km : 'Не указано'} км дороги</p>
                            <a href={`https://av.admtyumen.ru/#/directory/pipelines/inst_id=${pipeline.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
                        </Popup>
                    </Marker>
                    )
                } else debugger
            }
        });
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default PipelinesLayer;