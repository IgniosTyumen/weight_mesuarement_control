export const  projectOnLine = (line1, line2, pt) => {

    let isValid = false;

    let r = [0, 0];
    if (line1[0] == line2[0] && line1[1] == line2[1]) line1[0] -= 0.00001;

    let U = ((pt[0] - line1[0]) * (line2[0] - line1[0])) + ((pt[1] - line1[1]) * (line2[1] - line1[1]));

    let Udenom = Math.pow(line2[0] - line1[0], 2) + Math.pow(line2[1] - line1[1], 2);

    U /= Udenom;

    r[0] = line1[0] + (U * (line2[0] - line1[0]));
    r[1] = line1[1] + (U * (line2[1] - line1[1]));

    let minx, maxx, miny, maxy;

    minx = Math.min(line1[0], line2[0]);
    maxx = Math.max(line1[0], line2[0]);

    miny = Math.min(line1[1], line2[1]);
    maxy = Math.max(line1[1], line2[1]);

    isValid = (r[0] >= minx && r[0] <= maxx) && (r[1] >= miny && r[1] <= maxy);

    return isValid ? r : null;
}
