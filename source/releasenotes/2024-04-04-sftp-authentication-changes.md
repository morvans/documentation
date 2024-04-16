---
title: "SFTP Mode to require SSH key authentication starting April 30, 2024"
published_date: "2024-04-04"
categories: [action-required, deprecated]
---

Pantheon is updating our SFTP access control to require the use of SSH keys and we will disable access to SFTP via your Pantheon username and password beginning on <strong>April 30, 2024</strong>.

While you will still access the Pantheon Web dashboard with a username and password or Single Sign-On, access to SFTP (e.g. from your terminal or an application like Filezilla or Cyberduck) will require the use of an [SSH key](/ssh-keys).

We are making this change in the interest of maintaining a secure and reliable platform. You can find more information on how to configure your SFTP client to utilize SSH keys in our [public documentation](/guides/sftp/sftp-connection-info#authenticating).