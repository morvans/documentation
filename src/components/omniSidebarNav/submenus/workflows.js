import { getGuideDirectory, simpleLink } from './../helpers';

const workflows = () => {
  return {
    link: '/develop',
    title: 'Development workflows',
    children: [
      getGuideDirectory('guides/git', "Git"),
      simpleLink('/hotfixes'),
      getGuideDirectory('guides/multidev'),
      simpleLink('/sftp'),
      simpleLink('/core-updates'),

      // This page is empty
      simpleLink('/connection-modes'),

      getGuideDirectory('guides/new-relic', 'New Relic Performance Monitoring'),
      getGuideDirectory('guides/wordpress-composer', 'WordPress and Composer'),
      getGuideDirectory('guides/sftp', 'SFTP'),
      getGuideDirectory('guides/wp-cli', 'WP-CLI'),
      getGuideDirectory('guides/drush', 'Drush (the Drupal CLI)'),
      getGuideDirectory('guides/quicksilver', 'Quicksilver Workflow Hooks'),
      getGuideDirectory('guides/local-development', 'Local Development'),
      // maybe move this to a "tutorial" section
      getGuideDirectory('guides/wordpress-git', 'WordPress and Git'),
      getGuideDirectory('guides/build-tools', "build tools"),
      {
        link: '/asdfasdf',
        title: 'Random Tutorials',
        children: [
          simpleLink('/behat'),
          simpleLink('/visual-studio-code'),
        ]
      },
    ],
  }

};

export default workflows;
