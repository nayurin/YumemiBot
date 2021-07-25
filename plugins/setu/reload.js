const { writeFile } = require('fs');
const { getSetuDir, url } = require('./index');
const { httpsRequest } = require('../../dist/util');

let isReload = false;
const max_setu = 50;
const { logger } = global.yumemi;

module.exports = async () => {
  if (isReload) return logger.mark(`色图正在补充中...`);

  isReload = true;

  const { r17: { length: r17_length }, r18: { length: r18_length } } = await getSetuDir();

  if (r17_length > max_setu && r18_length > max_setu) return logger.info(`当前本地涩图 r17 有 ${r17_length} 张，r18 有 ${r18_length} 张，数量充足，无需补充`);

  for (let i = 0; i < 2; i++) {
    if (eval(`r${17 + i}_length`) > max_setu) continue;

    const params = `?r18=${i}&num=10&size=regular`;

    httpsRequest.get(url, params)
      .then(res => {
        const { data } = res;

        logger.mark(`开始补充 r${17 + i} 涩图`);

        for (let j = 0; j < data.length; j++) {
          const { urls: { regular }, pid, title } = data[j];

          httpsRequest.get(regular)
            .then(res => {
              /**
               * 文件名不能包含 \ / : * ? " < > |
               * cq 码 url 不能包括 [ ]
               * pid 与 title 之间使用 & 符分割，title 若出现非法字符则替换为 -
               */
              const setu_url = `./data/images/setu/r${17 + i}/${pid}&${title.replace(/(\\|\/|:|\*|\?|"|<|>|\||\[|\])/g, '-')}`;

              writeFile(setu_url, res, 'base64', (err) => {
                !err ? logger.mark(`setu download success, ${pid} ${title}`) : logger.error(err.message);
              })
            })
            .catch(err => {
              err && logger.error(err.message);
            })

          // 此处只是 http 请求发送完毕，并非全部下载完毕
          if (j === data.length - 1) {
            isReload = false;
            logger.mark(`色图补充完毕`);
          }
        }
      })
      .catch(err => {
        isReload = false;
        err && logger.error(err.message);
      });
  }

  logger.info(`r17 :${r17_length} ，r18 ${r18_length} ， ${r17_length < max_setu ? 'r17 ' : ''}${r18_length < max_setu ? 'r18' : ''} 数量不足 ${max_setu}，开始补充库存...`)
}