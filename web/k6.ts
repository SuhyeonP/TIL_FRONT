import { sleep } from 'k6';
import http from 'k6/http';

export let options = {
    vus: 1000,
    duration: '90s',
    insecureSkipTLSVerify: true,
};
export default function () {
    http.get('부하 줄 서버');
    sleep(1);
}
