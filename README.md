# Sjakkrating.no
![](http://i.imgur.com/4kzmo5X.png)
[Sjakkrating.no](http://sjakkrating.no) provides rating information and statistics for all Norwegian chess players.
## Contributing

### Bug Reports and Feature Requests

Use the [issue tracker](https://github.com/Assios/sjakkrating.no/issues) to report any bugs or request features.

### Developing

PRs are welcome. Follow these steps to set it up locally:

1. Install Meteor: ```curl https://install.meteor.com/ | sh```
2. Clone the repo: ```git clone https://github.com/Assios/sjakkrating.no.git```
3. Run ```meteor run``` and the app will be running on port 3000.

The app is located in the  ```sjakkrating``` folder. The API hosted at http://assios.no:8888 is located in the ```api``` folder (This is just used for fetching rating information from different sources and serving it all in one place).
#### No players?
If no players show up, make sure that http://assios.no:8888 is up and running. If it isn't, you could run it locally by running main.py from the /api folder (this could take up to 5 minutes). Then change http://assios.no:8888 to http://localhost:8888 in ```sjakkrating/server/fixtures.js``` and rerun the app.
