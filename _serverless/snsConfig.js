const devSns=['arn:aws:sns:us-east-1:908991390875:CodeStarNotifications-monetizely-core-fe-build-af6f1229e22e32a677b8b5a306d20c700450414e',
    'arn:aws:sns:us-east-1:908991390875:CodeStarNotifications-monetizely-core-be-build-0daa5a2132afcc333faf4613082c0037a5f21d3b']

const qaSns=['arn:aws:sns:us-east-1:354447074323:codestar-notifications-modetizely-code-build'];

module.exports = async ({ options, resolveVariable }) => {
    const profile = options['aws-profile'];
    snsList=[];
    if(profile==='dev'){
        snsList=devSns;
    }
    if(profile==='qa'){
        snsList=qaSns;
    }
    return snsList.map(function (sns) {
      return {
        sns: sns
      }
    });
  }