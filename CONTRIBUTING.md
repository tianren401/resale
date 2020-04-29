# Development Practices

## Feature Communication Should be Handled in Jira

The jira summary should be used to easily identify what the story relates to (ex. implement performers endpoint, add oauth sso, etc ...)

The Jira Description section should include a detailed explanation of the business requirements as well as any preliminary documents or links that help team members understand what needs to be done.

### What Should be Included in Jira Comments
* Questions relating to story requirements
* Architectural diagrams
* Communication between developers and business stakeholders
* Notes explaining blockers
* Notes explaining why additional work has been added to the story after the story is in progress
* Notes explaining time estimation changes
* Other important information that makes it easy for everyone to follow the story's progression

## Github Conventions and Guidelines

Please read [this excellent article](https://chris.beams.io/posts/git-commit/) on commit messages and adhere to them. It makes the lives of those who come after you a lot easier.

### Branching

Branches should consist of one unit of work per branch and should comply with the following naming convention:<br>

**Regex:** `[a-z]+\/(rp)-\d+((-.*)*)`<br>

**Allowed Prefixes:** [feature,bugfix,enhancement,release,task,test]<br>

**Examples:**

* feature/rp-123-test-feature
* task/rp-456-update-config

### Pull Requests

Pull requests should comply with the following naming convention:

**Regex:** `(RP)-[0-9]{1,5}: <description>`<br>

**Merging Strategy:**

* Feature branches get squash merged into dev
* Dev and stage get standard a merge commit into stage and master

**Examples:**

* RP-123: My new feature
* RP-432: Bugfix for bad config

#### Template Sections

**Overview:**

An overview should be provided at the feature level.

**Changelog:**

The changelog should include any technical changes made as a result of the feature being reviewed. A full technical explanation is not required. However, the changes should be lined out in enough detail that the it can be identified and referred to in the future.

**JIRA Ticket(s):**

A list of both the JIRA ticket directly related to the request as well as any relevant JIRA tickets should be included to provide context around what functionality is being added, changed, or affected.

**Related Pull Requests:**

This section will detail any dependent pull requests or pull requests that might otherwise be affected once the requested branch is merged.

**Note:** PRs can be referenced using Github Links by starting with a `#`

**Screenshots:**

This section should include any relevant screenshots or GIF’s that will help communicate changes to the UI

### One Commit Per Day

Team members should commit AND push their work a minimum of once daily at the end of the day. Incomplete, barely readable, and utterly nonsensical code does not have immunity from this requirement. We are not here to judge your code, we are here to get shit done. It is important to get our work off of our machines as often as possible. Frequent commits also helps keep everyone up to date on our current works in progress. It's better to see a half-built car on the line than no car at all.

**If you are doing research, a different work product is expected.**

## Communication Guidelines

* You will likely hear from your lead daily or at least a few times per week
* Sound the alarms and comment in Jira as soon as you run into a blocker
* Use Jira, Use Jira, Use Jira ...
* Communicate early, communicate often
