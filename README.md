# kvetch

A realtime live-API status page. Simple.

## Setup

```
curl https://install.meteor.com | sh
git clone https://github.com/j6k4m8/kvetch.git
cd kvetch
meteor
```

Then, run in a meteor shell:

```
Meteor.call('newEndpoint', 'name', 'url', condition, arg)
```

...where `condition` is from the `condition` dict, and `arg` is the comparator.

For instance, add the `http://openconnecto.me/ocp/ca/public_tokens/` endpoint with the following command:

```
Meteor.call('newEndpoint', 'NeuroData Public Tokens', 'http://openconnecto.me/ocp/ca/public_tokens/', conditions.STATUS_CODE, 200)
```

The endpoint will begin as `Broken`, and after 30 seconds it will refresh.

![image](https://cloud.githubusercontent.com/assets/693511/12908842/a003d8a0-cec8-11e5-8ae1-7625bc2fb81a.png)
